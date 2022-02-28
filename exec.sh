#!/bin/bash

option=""

if [ $0 = "-a" ] || [[ $# = 1  &&  $1 = "-a" ]] || [[ $# = 2  &&  $2 = "-a" ]] 
then
	export front=4000
	export http=4001
	export https=4333
	export db=4432
	export adminer=4888
	export client_id=86fc50a7e3722acbd29db85054adff0ea138a6374c2826daff10307850cd8914
	export client_secret=8f76f1fdbe01fab8ab9e950c0f480c8330c7732d47250f62c4c1ffbb3491a5bc
elif [ $0 = "-b" ] || [[ $# = 1  &&  $1 = "-b" ]] || [[ $# = 2  &&  $2 = "-b" ]] 
then
	export front=3000
	export http=3001
	export https=3333
	export db=5432
	export adminer=3888
	export client_id=f0a2ad126cf0cf8efe2ef0f4112fa0b3bba245e61fe0d6695680edff7810464d
	export client_secret=bced843a0688e6965579e4722a5e0ebba759f935be48e2a1d2f9910be108bf82
elif [ $0 = "-f" ] || [[ $# = 1  &&  $1 = "-f" ]] || [[ $# = 2  &&  $2 = "-f" ]] 
then
	export front=5000
	export http=5001
	export https=5333
	export db=5432
	export adminer=5888
	export client_id=8c41ad58501e58d3f2979a7d68075623ce3147dd306b6f5f340ec836323cbfd6
	export client_secret=a26f458f3c4b35522241a132a4479e2d8514f8607a158183ea5bb87e6123169e
elif [ $0 = "-s" ] || [[ $# = 1  &&  $1 = "-s" ]] || [[ $# = 2  &&  $2 = "-s" ]] 
then
	export front=6000
	export http=6001
	export https=6333
	export db=6432
	export adminer=6888
	export client_id=3cfe88d0df43c58af6ec6bcdc82c51db030f67ceb8901022cd40a884ab693849
	export client_secret=3a09b304e77486300b12815bbc50e327672e95ccf9b193090f919b3d89f5889e
else
	echo " You must select a pzgm member with an argument (-a for adrien -b for billy ect)"
	exit 0
fi

if [ $0 = "-d" ] || [[ $# = 1  &&  $1 = "-d" ]] || [[ $# = 2  &&  $2 = "-d" ]]
then
	option="-d"
fi

if [ $0 = "-r" ] || [[ $# = 1  &&  $1 = "-r" ]] || [[ $# = 2  &&  $2 = "-r" ]]
then
	docker system prune -af
fi

docker build -t back "./backend" 
docker build -t front "./frontend"
docker-compose up $option --remove-orphans