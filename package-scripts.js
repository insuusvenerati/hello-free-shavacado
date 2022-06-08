const { concurrent, series } = require("nps-utils");
const backendPackage = require("./apps/backend/package.json");
const frontendPackage = require("./apps/frontend/package.json");
require("dotenv").config();

const backendVersion = backendPackage.version;
const frontendVersion = frontendPackage.version;

const envArray = new Array(
  "NEXT_PUBLIC_CLERK_FRONTEND_API",
  "NEXT_PUBLIC_SUPABASE_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_API_URL",
  "SENTRY_AUTH_TOKEN",
);

const buildArgs = envArray.map((env) => `--build-arg ${env} `).join("");

module.exports = {
  scripts: {
    prepare: {
      description: "This sets up the project folder with dependencies and services",
      default: series.nps("prepare.frontend", "prepare.backend"),
      frontend: "yarn install",
      backend: "docker-compose -f apps/backend/docker-compose.yml up -d",
      supabase: "nps supabase.start",
    },
    docker: {
      description: "Manages docker related backend services",
      backend: {
        up: "docker-compose -f apps/backend/docker-compose.yml up -d",
        down: "docker-compose -f apps/backend/docker-compose.yml down",
        build: `docker build -t stiforr/hfs-backend:${backendVersion} .`,
      },
      frontend: {
        build: `docker build -f apps/frontend/Dockerfile ${buildArgs} -t stiforr/hfs-frontend:${frontendVersion} .`,
      },
    },
    supabase: {
      description: "Manages the supabase backend services",
      default: "nps supabase.start",
      start: "cd apps && supabase start",
      stop: "cd apps && supabase stop",
    },
    dev: {
      description: "Starts the dev environment",
      default: "yarn dev",
    },
    down: {
      description: "Destroys backend services",
      default: concurrent.nps("docker.backend.down"),
    },
    clean: {
      description: "Remove dev and build outputs from all projects",
      default: series.nps("clean.buildArtifacts", "clean.nodeModules"),
      buildArtifacts: "rimraf apps/frontend/.next apps/backend/dist",
      nodeModules: "rimraf node_modules apps/frontend/node_modules apps/backend/node_modules",
    },
  },
};
