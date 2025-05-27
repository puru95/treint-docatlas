FROM public.ecr.aws/t9x0g0x6/node20-alpine:latest
WORKDIR /app
COPY package*.json ./
RUN npm install -g pm2@latest
RUN npm install
COPY . .

# Set build-time environment variables
ARG API_URL
ENV API_URL=${API_URL}

ENV NODE_OPTIONS="--max-old-space-size=8192"
RUN npm run build
EXPOSE 3000
# RUN PM2 in cluster mode with all the logical cores in the machine
CMD ["pm2-runtime", "start", "index.js", "-i", "0"]