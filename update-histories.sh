pushd repo-commits; cargo build; popd; casperjs --engine=slimerjs scrape.js|python update.py|./repo-commits/target/release/repo-commits > package-histories.json
