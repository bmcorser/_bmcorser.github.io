import requests
import subprocess
from multiprocessing import Pool
import os
import shutil
import sys


def update_repo(name):
    if not repo_ok(name):
        return
    user, repo = name.split('/')
    shutil.rmtree(user, ignore_errors=True)
    os.makedirs(os.path.join('repos', user), exist_ok=True)
    if os.path.isdir(os.path.join('repos', user, repo, '.git')):
        # we already have that cloned
        cwd = os.path.join('repos', user, repo)
        specs = ((['git', 'fetch'], cwd),
                 (['git', 'reset', '--hard', 'origin/master'], cwd))
    else:
        # novel package
        cwd = os.path.join('repos', user)
        specs = (
            (['git', 'clone', 'https://github.com/{0}.git'.format(name), repo], cwd),
        )
    with open(os.devnull, "w") as devnull:
        for cmd, cwd in specs:
            proc = subprocess.Popen(cmd, cwd=cwd, stdout=devnull, stderr=devnull)
            proc.wait()
            if proc.returncode > 0:
                return
    return os.path.join('repos', user, repo)


def repo_ok(name):
    url = 'https://github.com/{0}'.format(name)
    head = requests.head(url)
    if not head.ok:
        sys.stderr.write("{0} had status {1}".format(url, head.status_code))
        sys.stderr.write('\n')
        # the repo is no longer public
        return False
    return True


def main():
    packages = []
    for line in sys.stdin:
        packages.append(str(line).strip())
    with Pool(8) as pool:
        result = filter(None, pool.map(update_repo, packages))
        print('\n'.join(result))

if __name__ == '__main__':
    main()
