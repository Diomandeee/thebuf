FROM node:16
RUN git clone  https://github.com/Diomandeee/market.git /usr/app/market
WORKDIR /usr/app/market
RUN npm ci --legacy-peer-deps
RUN npm run build
EXPOSE 3000
CMD ["npx", "next", "start"]