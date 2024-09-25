import { countLines } from '@/utils';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Badge,
  Box,
  Fab,
  Paper,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { MouseEvent, useMemo } from 'react';

export default function WarningFab({ invalidLines }: { invalidLines: string }) {
  const [anchorEl, setAnchorEl] = React.useState(null as any);
  const handleOpen = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'invalid-lines-popover' : undefined;

  const invalidCount = useMemo(() => countLines(invalidLines), [invalidLines]);

  return invalidCount > 0 ? (
    <>
      <Tooltip title={invalidCount + ' invalid lines'}>
        <Fab
          size='small'
          aria-label='Show warnings'
          onClick={handleOpen}
          sx={{ position: 'absolute', bottom: 30, right: 0 }}
        >
          <Badge badgeContent={invalidCount} color='secondary'>
            <WarningIcon />
          </Badge>
        </Fab>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant='h6' sx={{ fontSize: '14px' }}>
            无效的 CIDR
          </Typography>
          <Paper
            variant='outlined'
            square
            sx={{ border: '1px solid #e0e0e0', p: 1, fontSize: '12px' }}
          >
            <pre>
              <code>{invalidLines}</code>
            </pre>
          </Paper>
        </Box>
      </Popover>
    </>
  ) : (
    <></>
  );
}
