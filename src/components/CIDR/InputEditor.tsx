import { countLines } from '@/utils';
import { Box, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import WarningFab from './WarningFab';

export default function InputEditor({
  input,
  setInput,
  output,
}: {
  input: string;
  output: any;
  setInput: (value: string) => void;
}) {
  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        id='input'
        label='输入'
        placeholder={`6.6.6.0/24\n192.168.1.0/24\n192.168.0.0/16`}
        multiline
        fullWidth
        autoFocus
        rows={10}
        inputProps={{ wrap: 'soft' }}
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <Box>
        <Typography variant='caption' color='textSecondary'>
          行数: {useMemo(() => countLines(input), [input])}{' '}
        </Typography>
      </Box>
      <WarningFab invalidLines={output?.invalid} />
    </Box>
  );
}
