#!/usr/bin/env node
/* eslint-disable import/extensions */

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('хуй.0.0')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log('filepath1:', filepath1);
    console.log('filepath2:', filepath2);
    genDiff(filepath1, filepath2);
  })
  .option('-f, --format <type>', 'output format');

program.parse();

//   genDiff("../__fixtures__/file1.json", "../__fixtures__/file2.json");
