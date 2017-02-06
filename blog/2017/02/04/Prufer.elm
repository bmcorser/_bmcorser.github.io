import Debug
import String

import Html
import Html.Attributes
import Html.Events exposing (onInput, onClick)

import Svg
import Svg.Attributes

import Result.Extra exposing (combine)


main =
  Html.beginnerProgram
    { model = model
    , view = view
    , update = update
    }



-- MODEL


type alias Model =
  { input : String
  , prufer : List Int
  , error : String
  }

type alias V = (Float, Float)
type alias E = (V, V)

type Tree = Tree Int (List Tree)
type alias Forest = List Tree


model : Model

model = Model "1231" [1,2,3,1] ""

inputLabel : Int -> String -> Result String Int
inputLabel n string =
    case String.toInt string of
        Err msg -> Err msg
        Ok int ->
            if int > n then
                Err "Invalid Prüfer sequence"  -- TODO: Explain why
            else
                Ok int



handleInput : Model -> String -> Model
handleInput model input =
    let
        n = (String.length input) + 2
        strings = List.map String.fromChar (String.toList input)
    in
      case combine <| List.map (inputLabel n) strings of
          Err msg ->
              { model | input = "", prufer = [], error = msg }
          Ok prufer ->
              { model | input = input, prufer = prufer, error = "" }

-- UPDATE


type Msg
    = Input String
    | Start
    | Reset


update : Msg -> Model -> Model
update msg model =
  case msg of
    Input input -> handleInput model input
    Start -> model
    Reset -> model

-- VIEW

startButton : Model -> Html.Html Msg
startButton model =
    if model.error == "" && model.prufer /= [] then
        Html.button [ onClick Start ] [ Html.text "Start" ]
    else
        Html.span [] []


view : Model -> Html.Html Msg
view model =
  Html.div []
    [ Html.input [ Html.Attributes.type_ "text", Html.Attributes.placeholder "Prüfer sequence", onInput Input ] []
    , Html.div [] [ Html.text model.error ]
    , Html.div [] [ Html.text <| toString model.prufer ]
    -- , startButton model
    , Html.div [] [ drawOuter model ]
    ]


drawOuter : Model -> Html.Html Msg
drawOuter model =
    if model.error == "" && model.prufer /= [] then
        canvas [ drawInner model ]
    else
        Html.span [] []


canvas : List (Svg.Svg Msg) -> Svg.Svg Msg
canvas children =
    Svg.svg [ Svg.Attributes.viewBox "0 0 100 100"
            , Svg.Attributes.width "700px"
            ] children


drawInner : Model -> Svg.Svg Msg
drawInner model =
    let
        list = List.range 1 <| (String.length model.input) + 2
        tree = constructTree (constructEdges [] list model.prufer) Nothing
    in
        drawTree ((50, 50), tree)


constructEdges : List (Int, Int) -> List Int -> List Int -> List (Int, Int)
constructEdges edges list sequence =
    case List.head sequence of
        Just sequenceLabel ->
            case nextLabel list sequence 0 of
                Just (listLabel, index) ->
                    let
                        (remainingList, remainingSequence) = remaining list index sequence
                    in
                    constructEdges ((listLabel, sequenceLabel) :: edges) remainingList remainingSequence
                _ -> [] -- unreachable
        Nothing -> case list of
            [left, right] -> (left, right) :: edges
            _ -> [] -- unreachable

remaining : List Int -> Int -> List Int -> (List Int, List Int)
remaining list index sequence =
    let
        remainingList = List.append
            (List.take index list)
            (List.drop (index + 1) list)
        remainingSequence = case List.tail sequence of
            Just list -> list
            Nothing -> []
    in (remainingList, remainingSequence)



constructTree : List (Int, Int) -> Maybe Tree -> Tree
constructTree edges partialTree =
    case (partialTree, List.head edges, List.tail edges) of
        (Nothing, Just (left, right), Just remainingEdges) ->
            constructTree remainingEdges (Just (Tree left [ Tree right [] ]))
        (Just tree, Just (left, right), Just remainingEdges) ->
            if labelMember right tree then
                constructTree remainingEdges (Just (addEdgeTree left right tree))
            else
                constructTree
                    (List.append remainingEdges [(right, left)])
                    (Just (addEdgeTree left right tree))
        (Just tree, Just (left, right), Nothing) ->
            if labelMember left tree then
                addEdgeTree left right tree
            else if labelMember right tree then
                addEdgeTree right left tree
            else
                Tree -2 []
        (Just tree, Nothing, Nothing) -> tree
        (_, _, _) ->
                Tree -3 []

addEdgeTree : Int -> Int -> Tree -> Tree
addEdgeTree child parent tree =
    let (Tree label trees) = tree in
        if parent == label then
            Tree label ((Tree child []) :: trees)
        else
            Tree label (List.map (addEdgeTree child parent) trees)

labelMember : Int -> Tree -> Bool
labelMember left tree =
    let (Tree right trees) = tree in
    if left == right then True else List.any (labelMember left) trees


nextLabel : List Int -> List Int -> Int -> Maybe (Int, Int)
nextLabel list sequence index =
    case List.head list of
        Just label ->
            if List.member label sequence then
                case List.tail list of
                    Just remainingList ->
                        nextLabel remainingList sequence (index + 1)
                    _ -> Nothing
            else
                Just (label, index)
        _ -> Nothing




drawTree : ((Float, Float), Tree) -> Svg.Svg Msg
drawTree ((x, y), tree) =
    let
        (Tree label trees) =  tree
        degree = (List.length trees)
        vertexSvg = drawVertex label (x, y)
        layout = List.map
            (vertexDegreeLayout (x, y) degree)
            (List.indexedMap (,) trees)
        edgesSvg = List.map (drawEdge (x, y))
            (List.map (\x -> let (v,t) = x in v) layout)
    in
        Svg.g [] <| List.concat
            [ edgesSvg
            , List.map drawTree layout
            , [ vertexSvg ]
            ]


edgeLength = 10.0

vertexDegreeLayout : V -> Int -> (Int, Tree) -> (V, Tree)
vertexDegreeLayout (x, y) degree (index, tree) =
    let
        arc = (2 * pi) / toFloat (degree + 1)
        indexth = toFloat (index + 1) * arc
        dx = sin indexth
        dy = cos indexth
    in
    ((x + (edgeLength * dx), y + (edgeLength * dy)), tree)


drawVertex : Int -> V -> Svg.Svg Msg
drawVertex label (x, y) =
    Svg.g []
        [ Svg.circle
            [ Svg.Attributes.cx <| toString x
            , Svg.Attributes.cy <| toString y
            , Svg.Attributes.r "2"
            , Svg.Attributes.fill "white"
            , Svg.Attributes.stroke "black"
            , Svg.Attributes.strokeWidth "0.2"
            ] []
        , Svg.text_
            [ Svg.Attributes.x <| toString x
            , Svg.Attributes.y <| toString <| y + 1
            , Svg.Attributes.textAnchor "middle"
            , Svg.Attributes.fontSize "3"
            ]
            [ Svg.text <| toString label ]
        ]


drawEdge : V -> V -> Svg.Svg Msg
drawEdge (x1, y1) (x2, y2) =
    Svg.line
    [ Svg.Attributes.x1 <| toString x1
    , Svg.Attributes.y1 <| toString y1
    , Svg.Attributes.x2 <| toString x2
    , Svg.Attributes.y2 <| toString y2
    , Svg.Attributes.stroke "black"
    , Svg.Attributes.strokeWidth "0.2"
    ]
    []


