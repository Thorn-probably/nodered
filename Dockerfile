FROM nodered/node-red:latest

USER root

# Install postgres drivers, bcryptjs, and the storage adapter inside Node-RED
RUN npm install --prefix /usr/src/node-red \
    node-red-contrib-db-storage \
    pg \
    bcryptjs

USER node-red

# Place settings file in Node-RED default path
COPY --chown=node-red:root settings.js /data/settings.js

# Cap memory strictly using the allowed max-old-space-size flag
ENV NODE_OPTIONS="--max-old-space-size=128"
ENV PORT=1880

EXPOSE 1880

# Clear the base image entrypoint to prevent command argument collisions
ENTRYPOINT []

# Start Node-RED using custom settings and user directory
CMD ["npm", "start", "--cache", "/data/.npm", "--", "--settings", "/data/settings.js", "--userDir", "/data"]

