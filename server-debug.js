#!/usr/bin/env node
/**
 * Debug wrapper for the Next.js standalone server.
 * Patches http.createServer to log every TCP connection and HTTP request,
 * then hands off to server.js.
 *
 * Logged fields:
 *   [CONNECT]    timestamp  remote-ip:port
 *   [REQUEST]    timestamp  remote-ip  "METHOD /path"  "User-Agent"
 *   [DISCONNECT] timestamp  remote-ip:port
 */
"use strict";

const http = require("http");
const https = require("https");

function patchServer(server) {
  server.on("connection", (socket) => {
    const addr = socket.remoteAddress ?? "unknown";
    const port = socket.remotePort ?? 0;
    console.log(`[CONNECT]    ${new Date().toISOString()}  ${addr}:${port}`);
    socket.on("close", () => {
      console.log(`[DISCONNECT] ${new Date().toISOString()}  ${addr}:${port}`);
    });
  });

  server.on("request", (req) => {
    const addr = req.socket?.remoteAddress ?? "unknown";
    const ua = req.headers["user-agent"] ?? "-";
    const ref = req.headers["referer"] ?? "-";
    console.log(
      `[REQUEST]    ${new Date().toISOString()}  ${addr}  "${req.method} ${req.url}"  ua="${ua}"  ref="${ref}"`
    );
  });

  return server;
}

// Patch plain HTTP
const origHttp = http.createServer.bind(http);
http.createServer = function (...args) {
  return patchServer(origHttp(...args));
};

// Patch HTTPS (in case TLS termination happens inside the container)
const origHttps = https.createServer.bind(https);
https.createServer = function (...args) {
  return patchServer(origHttps(...args));
};

console.log(`[DEBUG MODE] ${new Date().toISOString()}  Connection logging enabled`);

// Delegate to the Next.js standalone server
require("./server.js");
