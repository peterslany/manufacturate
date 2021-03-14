Generate keys for encryption and set as environment variables.

*Using node-jose*

JWT_ENCRYPTION_KEY
`jose newkey -s 256 -o -a A256GCM`

JWT_SIGNING_PRIVATE_KEY
`jose newkey -s 256 -t oct -a HS512`