#!/bin/sh


if [[  "$CI_BRANCH" == "alpha" ]]; then
  export S3_BUCKET="bss-alpha.apigateway.in"
  export BUILD_ENVIRONMENT="alpha"
  echo "Exported $S3_BUCKET $BUILD_ENVIRONMENT"
elif [[  "$CI_BRANCH" == "beta" ]]; then
  export S3_BUCKET="bss-beta.apigateway.in"
  export BUILD_ENVIRONMENT="beta"
  echo "Exported $S3_BUCKET $BUILD_ENVIRONMENT"
elif [[  "$CI_BRANCH" == "gamma" ]]; then
  export S3_BUCKET="bss-gamma.apigateway.in"
  export BUILD_ENVIRONMENT="gamma"
  echo "Exported $S3_BUCKET $BUILD_ENVIRONMENT"
elif [[  "$CI_BRANCH" == "prod" ]]; then
  export S3_BUCKET="bss-prod.apigateway.in"
  export BUILD_ENVIRONMENT="prod"
  echo "Exported $S3_BUCKET $BUILD_ENVIRONMENT"
fi

export CI=false
