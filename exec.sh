#!/bin/bash

option=""

if [ ${@: -1} = "-d" ] || [[ $# = 1  &&  $1 = "-d" ]]
then
	option="-d"
fi

docker build -t back "./backend" 
docker build -t front "./frontend"
docker-compose up $option --remove-orphans