FROM alpine:3.15

EXPOSE 4200

# add the user and create its working dir
RUN apk add --no-cache \
    bash \
    jq \
    nginx \
    nginx-mod-devel-kit \
    nginx-mod-http-set-misc \
    nginx-mod-http-headers-more && \
    adduser -D -u 1001 1001 && \
    mkdir -p /dist && chown -R 1001:1001 /dist


# install adeo certificates
RUN set -xe; \
    apk add --no-cache  wget; 

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/entrypoint.sh /entrypoint.sh

RUN rm -rf /etc/nginx/conf.d && \
    chown 1001:1001 /entrypoint.sh /etc/nginx/nginx.conf && chmod +x /entrypoint.sh

COPY dist/happy-beer-ui/. /dist
RUN chown -R 1001:1001 /dist

RUN mkdir -p /tmp/logs && chown 1001:1001 /tmp/logs

USER 1001
WORKDIR /dist

# RUN
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-p", "/tmp"]
