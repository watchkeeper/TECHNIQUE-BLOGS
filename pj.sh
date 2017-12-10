#!/bin/bash
###############################
############jie xie json
###############################

declare LOG_DIR=/tmp/pj.log
###Specify the start and end of the string  . Return : start end
function indexOf(){
	echo $(grep -E -b -o "$2" <<< "$1" | head -n 1 |  awk -F: 'BEGIN{sum=0}{for(i=2;i<=NF;i++)(sum+=length($i))}END{print $1,sum + $1}'  ) 
	return 1
}

##verify String   "hello "   \"   \\"  \\\"world"
function verifyStr(){
	echo "TODO ..."
}
##Verify that the value is legal 
##1->string 2->numric 3->boolean 4->NULL 5->array 6->object
##param1 : type 
##param2:  value
function verifyV(){
	case "$1" in
		1 )
			verifyStr "$2"
			;;
	esac
}

function verifyFirstNotEmptyEle(){
	local first i srcV="$1"
	local len=${#srcV}
	for((i=0;i<=len;i++)){
		first=$( tr -d " " <<< ${srcV:i:1} )
		if [[  ! "$first" == "" ]];then
			case "$first" in
				{) echo "$i"
					return 6
					;;
				[ )  echo "$i"
					return 5
					;;
				\") echo "$i   $first" 
					return  1
					;;
				*) return 0
					;;
			esac
			break
		fi
	}
}
##Parse the simple format
##Return value
function parseSimple(){
	local v i  
	local srcV="$1"
	
	local pos=$(verifyFirstNotEmptyEle "$srcV" |awk '{print $1}')
	local first=$(verifyFirstNotEmptyEle "$srcV" |awk '{print $2}')
	srcV=${srcV:$pos} 
	#Determine whether the value is a string
	if [[ "$first" == "\"" ]]; then
		echo "I'm string " 
		local target=".*?[\"]\s*?,"
		local lastEleTarget=".*?[\"]\s*?(\n|})?"
		local t=$(indexOf "$srcV"  "$target" )
		if   grep "^[[:digit:]]*$" <<< "$t"  ;then
			t=$(indexOf "$srcV"  "$lastEleTarget" )
		fi
		local s=$( awk '{print $1}' <<< "$t" )
		local e=$( awk '{print $2}' <<< "$t")
		v=${srcV:$s + 1:$e}
		v=${v%\"*}
	else
		#echo "I'm not string "  
		v=${srcV%%,*}  
		v=${v%%\}*}
	fi
	echo  "$v"
}

##根据键值获取后面字符串
function get(){
	local k=$1
	local srcV=$2
	local reg="$k\"\s*"

	local pos=$(indexOf "$srcV" "$reg" | awk '{print $2}')
	srcV=${srcV:$pos + 1}
	echo "$srcV"
}

##Parse the array type
function parseArr(){
	echo ""
}

##Parse the object type
function parseObj(){
	echo ""
}

json=$(cat $1)
src=$(get "$2" "$json")

#v=$(parseSimple "$src")
result=$(verifyFirstNotEmptyEle "$src")
case $? in
	5 ) v=$(parseArr "$src")
		;;
	1) v=$(parseSimple "$src")
		;;
esac
echo "$v"
