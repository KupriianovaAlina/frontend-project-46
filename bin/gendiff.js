#!/usr/bin/env node
import { Command } from 'commander';
import buildDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('хуй.0.1')
  .option('-f, --format <type>', 'output formats: stylish, plain, json', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(buildDiff(filepath1, filepath2, program.opts().format));
  });

program.parse();
