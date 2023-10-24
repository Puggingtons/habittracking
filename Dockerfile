FROM node:lts as dev_backend

# copy configs of backend and install dependencies
WORKDIR /app/backend
COPY backend/package.json backend/yarn.lock backend/tsconfig.build.json backend/tsconfig.json backend/nest-cli.json backend/.eslintrc.js ./
RUN yarn

# copy code of backend
COPY backend/src ./

CMD [ "yarn", "start:dev" ]

# ---------------------------------------------------------------------- #

FROM node:lts as dev_frontend

# copy configs of frontend and install dependencies
WORKDIR /app/frontend
COPY frontend/package.json frontend/yarn.lock frontend/tsconfig.json ./
RUN yarn

# copy code of frontend
COPY frontend/public frontend/src  ./

CMD [ "yarn", "start" ]