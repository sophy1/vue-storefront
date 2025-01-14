import { spawn } from 'child_process';
import {
  logSimpleErrorMessage,
  logSimpleSuccessMessage
} from './terminalHelpers';
import { t } from 'i18next';

const checkNodeVersion = (nodeString: string): boolean => {
  const nodeVersion = nodeString.split('v')[1]?.split('.')[0];
  const subNodeVersion = nodeString.split('v')[1]?.split('.')[1];

  if (Number(nodeVersion) === 16 && Number(subNodeVersion) >= 13) {
    return true;
  }

  return false;
};

/** Checking if Node version is correct as per prerequisites */
const checkNode = async (): Promise<void> => {
  const node = spawn('node', ['-v']);

  return await new Promise((resolve) => {
    node.stdout.on('data', (data) => {
      if (!checkNodeVersion(data.toString())) {
        logSimpleErrorMessage(t('command.generate_store.magento.node_not_ok'));
        process.exit(1);
      }
    });

    node.on('close', () => {
      logSimpleSuccessMessage(t('command.generate_store.magento.node_ok'));
      resolve();
    });
  });
};

export default checkNode;
