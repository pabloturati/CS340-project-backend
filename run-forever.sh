: '
This is a shell script to automate the execution of Forever
$1 - optional.  to change the file name to be executed.  Defaults to "diagnostic.js"
$2 - optional.  to change the port where the file will run defaults to 8970
'

#! /bin/bash

defaultPort=5959
defaultFile=./bin/www

# Stop other forever processes
./stop-forever.sh

# Checks for a custom file name
if [ -n "$1" ]; then
    echo "Starting forever service on file $1"
    
    # Checks for a custom port
    if [ -n "$2" ]; then
        echo "Going Live on port $2"
        ./node_modules/forever/bin/forever start $1 $2
    else
        echo "Going live on port default port $defaultPort"
        ./node_modules/forever/bin/forever start $1 $defaultPort
    fi
    
else
    echo "Starting forever service on default filename $defaultFile and going live on default port $defaultPort"
    ./node_modules/forever/bin/forever start $defaultFile $defaultPort
    echo "Live on $hostname"
fi
