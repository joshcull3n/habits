from subprocess import run
import time
import argparse

parser = argparse.ArgumentParser()
parser.add_argment('--frontendonly', action='store_true', help='does not run any of the backend. frontend will run locally and ping the remote server.')
args = parser.parse_args()

tmux_name='habits_local'

# kill if already exists
run(['tmux','kill-session','-t',tmux_name])

if args.frontendonly:
    print('only running React. App will hit the remote server.')
    run(['tmux','new-session','-d','-s',tmux_name,'cd ~/git/habits/habits && npm start'])
else:
    print('running front and backend. App will hit the local server. Ensure mongoDB is running.')
    run(['tmux','new-session','-d','-s',tmux_name,'cd ~/git/habits/habits && REACT_APP_API_URL_BASE="" npm start'])
    run(['tmux','split-window','-h','-t',tmux_name,'cd ~/git/habits/backend && node server.js --localdb'])
    run(['tmux','split-window','-v','-t',tmux_name,'mongosh'])
run(['tmux','select-pane','-t','0'])
run(['tmux','split-window','-v','-t',tmux_name,'cd ~/git/habits; zsh'])

# attach
run(['tmux','attach-session','-t','habits_local'])
