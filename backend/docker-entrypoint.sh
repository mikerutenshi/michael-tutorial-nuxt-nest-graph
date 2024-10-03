#!/bin/bash

# Apply migrations
prisma migrate dev --name init user

exec "$@"
