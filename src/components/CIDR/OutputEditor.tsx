import { Box, TextField } from '@mui/material';
import OutputStatusLine from './OutputStatusLine';

export default function OutputEditor({
  ipKind,
  output,
}: {
  ipKind: string;
  output: any;
}) {
  return (
    <Box position='relative'>
      {' '}
      <TextField
        id='input'
        label='输出'
        placeholder='No input'
        multiline
        fullWidth
        rows={10}
        inputProps={{ wrap: 'soft' }}
        value={[
          ipKind !== 'ipv6' && output?.v4?.ranges,
          ipKind !== 'ipv4' && output?.v6?.ranges,
        ]
          .filter((v) => v)
          .join('\n')}
      />
      <Box>
        <OutputStatusLine output={output} />
      </Box>
    </Box>
  );
}
