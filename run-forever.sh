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

echo "Starting forever service on file $defaultFile on $defaultPort"
./node_modules/forever/bin/forever start $defaultFile $2

# Checks for a custom port
if [ -n "$1" ]; then
    echo "Starting forever service on file $1"
    
    echo "Starting forever service on file $defaultFile on $1"
    ./node_modules/forever/bin/forever start $defaultFile $1
    echo "Live on $hostname $1"
    
else
    echo "Starting forever service on file $defaultFile on $defaultPort"
    ./node_modules/forever/bin/forever start $defaultFile $defaultPort
    echo "Live on $hostname $defaultPort"
fi


echo "Process Code: $? - Successful"
if [ $? != 0 ]; then
    echo "Process Code: $? - Unsuccessful"
fi
