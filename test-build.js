const { exec } = require('child_process');
exec('npm run build', { cwd: 'd:\\10. [Careers]\\Github - Portfolio\\portfolio' }, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
