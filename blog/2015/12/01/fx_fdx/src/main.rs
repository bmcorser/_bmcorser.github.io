extern crate rand;
extern crate sha1;

use std::process::Command;
use std::collections::HashMap;
use std::io;
use rand::{thread_rng, sample};
use sha1::Sha1;

fn compare (input: String, fdx: &str) -> bool {
    let mut input_sha1 = Sha1::new();
    input_sha1.update(input.trim().as_bytes());
    fdx.as_bytes() == input_sha1.hexdigest()[..7].as_bytes()
}

fn display (name: &str) {
    Command::new("display")
        .arg("-border").arg("10")
        .arg("-bordercolor").arg("white")
        .arg("-density").arg("200")
        .arg(name)
        .output()
        .unwrap_or_else(|e| { panic!("{}", e) });
    }

fn main () {
    let mut fx_fdx = HashMap::new();

    fx_fdx.insert("q-0741fac", "e9e9dc6");
    fx_fdx.insert("q-1624dce", "1624dce");
    fx_fdx.insert("q-189199f", "c65ec7a");
    fx_fdx.insert("q-26d1990", "566261d");
    fx_fdx.insert("q-3ad999b", "d339226");
    fx_fdx.insert("q-43630ee", "61d8e53");
    fx_fdx.insert("q-4f1ae87", "2ba2cbb");
    fx_fdx.insert("q-5600f00", "d849a01");
    fx_fdx.insert("q-67fd40d", "5600f00");
    fx_fdx.insert("q-a297bb9", "b82f717");
    fx_fdx.insert("q-bd04e97", "d261fd4");
    fx_fdx.insert("q-d6d9338", "5edd4ce");

    let mut rng = thread_rng();
    let (fx, fdx) = sample(&mut rng, fx_fdx, 1).pop().unwrap();

    // println!("{:#?}, {:#?}", fx, fdx);

    display(fx);

    let mut input = String::new();
    match io::stdin().read_line(&mut input) {
        Ok(_) => {},  // println!("'{}'", input.trim()),
        Err(error) => println!("error: {}", error),
    }

    match compare(input, fdx) {
        true => {},
        false => display(fdx)
    };
}
