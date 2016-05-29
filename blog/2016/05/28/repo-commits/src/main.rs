extern crate git2;
extern crate rustc_serialize;

use std::collections::HashMap;
use std::io;
use std::io::prelude::*;
use std::thread;

use git2::{Repository, Oid};
use rustc_serialize::json::{self, ToJson, Json};

fn main() {
    let stdin = io::stdin();
    let input = stdin.lock().lines();
    let mut histories: HashMap<String, Vec<i64>> = HashMap::new();
    for line in input {
        let repo_path = line.unwrap();
        let repo = Repository::open(repo_path).unwrap();
        let mut revwalk = repo.revwalk().unwrap();
        revwalk.push_head();
        for oid in revwalk {
            let commit = repo.find_commit(oid).unwrap();
            let name = String::from(commit.author().name().unwrap());
            let time = commit.time().seconds();
            if time > 1388534400 { // start around Jan 2014
                if histories.contains_key(&name) {
                    let contrib_history = histories.get_mut(&name).unwrap();
                    contrib_history.sort();
                    contrib_history.push(time);
                } else {
                    histories.insert(name, vec![time]);
                }
            }
        }
    }
    println!("{}", json::encode(&histories).unwrap());
}
