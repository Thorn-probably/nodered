FROM nodered/node-red:latest

USER root

# Install postgres database storage driver and bcryptjs for runtime password hashing
RUN npm install --prefix /usr/src/node-red \
    node-red-contrib-db-storage \
    pg \
    bcryptjs

USER node

# Copy custom settings file
COPY settings.js /data/settings.js

# Cap memory usage below 128 MB to avoid crashing on the 512 MB Nano tier
ENV NODE_OPTIONS="--max-old-space-size=128 --optimize-for-size"
ENV PORT=1880

EXPOSE 1880

# Start Node-RED using our custom settings file and dynamic Voroa port
CMD ["sh", "-c", "npm start --cache /data/.npm -- --settings /data/settings.js --port ${PORT}"]

