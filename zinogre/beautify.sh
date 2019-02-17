#!/bin/bash

find .  -path ./node_modules -prune -o -name '*.js' -print -exec prettier --no-bracket-spacing --jsx-bracket-same-line	--use-tabs --write  {} \;