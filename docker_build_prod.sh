#!/usr/bin/env bash
#
# Copyright 2015, Simon Luetzelschwab
#
# Build & run as docker container in prod.
#
IMAGE_ORG="simonpure"
IMAGE_NAME="prod"
IMAGE_VERSION="v1"

IMAGE_FULL="${IMAGE_ORG}/${IMAGE_NAME}:${IMAGE_VERSION}"

RUNNING=$(docker ps | grep "${IMAGE_FULL}" | cut -f1 -d' ')

docker build -f Dockerfile.prod -t "${IMAGE_FULL}" .

docker stop "${RUNNING}"

docker run -d -e VIRTUAL_HOST=www.simonandjackie.info,simonandjackie.info "${IMAGE_FULL}"
