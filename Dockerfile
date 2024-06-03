FROM node:lts AS dev_backend

# copy configs of backend and install dependencies
WORKDIR /app/backend
COPY backend/package.json backend/yarn.lock backend/tsconfig.build.json backend/tsconfig.json backend/nest-cli.json backend/.eslintrc.js backend/.env ./
RUN yarn
RUN yarn global add @nestjs/cli

COPY backend/prisma ./prisma
RUN npx prisma generate

# copy code of backend
COPY backend/src ./src

CMD [ "yarn", "start:dev" ]

# ---------------------------------------------------------------------- #

FROM node:lts AS dev_frontend

# copy configs of frontend and install dependencies
WORKDIR /app/frontend
COPY frontend/package.json frontend/yarn.lock frontend/tsconfig.json ./
RUN yarn
RUN yarn global add react-scripts

# copy code of frontend
COPY frontend/public frontend/src  ./

CMD [ "yarn", "start" ]