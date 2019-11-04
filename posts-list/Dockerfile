FROM tiangolo/node-frontend as build-stage
WORKDIR /app/client
COPY package*.json /app/client/
RUN npm install
COPY ./ /app/client/

#For Development : ----------------------
CMD ["npm", "start"]

#For Production : ----------------------
# RUN npm run build
# FROM nginx:1.15
# COPY --from=build-stage /app/client/build/ /usr/share/nginx/html
