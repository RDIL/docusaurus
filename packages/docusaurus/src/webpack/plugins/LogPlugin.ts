/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import webpack from 'webpack';
import WebpackBar from 'webpackbar';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';

function showError(arr: string[]): void {
  console.log(`\n\n${arr.join('')}`);
}

class LogPlugin extends WebpackBar {
  apply(compiler: webpack.Compiler): void {
    super.apply(compiler);

    compiler.hooks.done.tap('WebpackNiceLog', (stats) => {
      if (stats.hasErrors()) {
        const messages = formatWebpackMessages(
          stats.toJson('errors-only', true),
        );
        if (messages.errors.length) {
          showError(messages.errors);
        }
      }
    });
  }
}

export default LogPlugin;
