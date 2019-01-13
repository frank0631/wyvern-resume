#!/bin/bash

echo logging in...
login_data=$(curl -s \
  -d "client_id=admin-cli" \
  -d "username=admin" \
  -d "password=Pa55w0rd" \
  -d "grant_type=password" \
  "http://keycloak:8080/auth/realms/master/protocol/openid-connect/token");
access_token=$(echo $login_data | jq --raw-output '.access_token')
access_token_size=${#access_token} 
echo access_token size: $access_token_size

echo creating realm...
realm_data='{"realm":"wyvern", "sslRequired":"none", "enabled":true}'
curl -o /dev/null -s -w "%{http_code}\n" \
  -H "Authorization: bearer $access_token" \
  -H "Accept: application/json" \
  -H "Content-Type:application/json" \
  -X POST -d "$realm_data" \
  "http://keycloak:8080/auth/admin/realms"

echo getting wyvern realm data...
wyvern_data=$(curl -s \
  -H "Authorization: bearer $access_token" \
  "http://keycloak:8080/auth/realms/wyvern");
relm_name=$(echo $wyvern_data | jq --raw-output '.realm')
echo got data for relm: $relm_name

#3fd25198-d3ed-491f-adfd-2ccfec498cb2

echo creating client...
client_data='{"id": "girros-backend", "clientId": "girros-backend", "rootUrl": "/girros", "adminUrl": "/girros", "enabled": true, "clientAuthenticatorType": "client-secret", "redirectUris": ["http://code.frank0631.com:34623/*"], "webOrigins": ["http://code.frank0631.com:34623"], "protocol": "openid-connect", "access": {"view": true, "configure": true, "manage": true } }'
curl -o /dev/null -s -w "%{http_code}\n" \
  -H "Authorization: bearer $access_token" \
  -H "Accept: application/json" \
  -H "Content-Type:application/json" \
  -X POST -d "$client_data" \
  "http://keycloak:8080/auth/admin/realms/wyvern/clients"


#client_data=$(curl -s \
# -H "Authorization: bearer $access_token" \
# "http://keycloak:8080/auth/admin/realms/wyvern/clients/girros-backend");
#echo client data: $client_data

echo creating client secret...
client_secret=$(curl -s \
  -H "Authorization: bearer $access_token" \
  -H "Accept: application/json" \
  -H "Content-Type:application/json" \
  -X POST -d "$client_data" \
  "http://keycloak:8080/auth/admin/realms/wyvern/clients/girros-backend/client-secret");
echo client_secret: $client_secret

echo creating girros user...
user_data='{"id": "girros", "username": "girros", "enabled":true, "credentials" : [{ "type":"password", "value":"girros"}] } }'
curl -o /dev/null -s -w "%{http_code}\n" \
  -H "Authorization: bearer $access_token" \
  -H "Accept: application/json" \
  -H "Content-Type:application/json" \
  -X POST -d "$user_data" \
  "http://keycloak:8080/auth/admin/realms/wyvern/users"
