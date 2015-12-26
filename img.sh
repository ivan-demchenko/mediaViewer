#!/bin/bash

for i in "$@"
do
  case $i in
      --req-path=*)
      REQ_PATH="${i#*=}"
      shift # past argument=value
      ;;
      --req-file=*)
      REQ_FILE="${i#*=}"
      shift # past argument=value
      ;;
      --root-path=*)
      ROOT_PATH="${i#*=}"
      shift # past argument=value
      ;;
      --cache-path=*)
      CACHE_PATH="${i#*=}"
      shift # past argument=value
      ;;
      --new-size=*)
      NEW_SIZE="${i#*=}"
      shift # past argument=value
      ;;
      *)
            # unknown option
      ;;
  esac
done

mkdir -p "$CACHE_PATH/$REQ_PATH"
convert "$ROOT_PATH/$REQ_PATH/$REQ_FILE" -resize $NEW_SIZE -quality 100 "$CACHE_PATH/$REQ_PATH/$REQ_FILE"
