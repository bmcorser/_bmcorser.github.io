extern crate git2;
extern crate rustc_serialize;

use std::collections::HashMap;
use std::io;
use std::io::prelude::*;
use std::thread;

use git2::{Repository, Oid};
use rustc_serialize::json::{self, ToJson, Json};

#[derive(RustcEncodable, Debug)]
struct RepoJson {
    name: String,
    history: Vec<i64>,
}

fn main() {
    let stdin = io::stdin();
    let input = stdin.lock().lines();
    let mut children = HashMap::new();
    for line in input {
        let name = line.unwrap();
        children.insert(name.clone(), thread::spawn(move || {
            let repo = Repository::open(name.clone()).unwrap();
            let mut revwalk = repo.revwalk().unwrap();
            let mut repo_json = RepoJson { name: name.clone(), history: vec![] };
            revwalk.push_head();
            for oid in revwalk {
                let time = repo.find_commit(oid).unwrap().time().seconds();
                repo_json.history.push(time);
            }
            repo_json
        }));
    }
    let mut output = vec![];
    for (name, repo_thread) in children {
        output.push(repo_thread.join().unwrap());
    }
    println!("{}", json::encode(&output).unwrap());
}
