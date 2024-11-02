import os
import subprocess

print('deploying frontend...')

os.chdir(os.path.expanduser('~/git/habits/habits'))
result = subprocess.run(['npm','run','deploy'], capture_output=True, text=True)
if result.returncode == 0:
    print('success')
else:
    print('frontend deployment failed. cancelling.')
    print(result.stdout)
    print(result.stderr)
    exit(1)

print('deploying backend...')
result = subprocess.run(['git','push','heroku','main'], capture_output=True, text=True)
if result.returncode == 0:
    print('success')
else:
    print('backend deployment failed. considering rolling back the frontend.')
    print(result.stdout)
    print(result.stderr)

print('successfully deployed the habits app')
