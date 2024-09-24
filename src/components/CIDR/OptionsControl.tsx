import { Button, Grid } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';

function OptionsControl(
  {
    ipKind,
    toggleIpv4,
    toggleIpv6,
    bogonFilter,
    toggleReservedFilter,
    handleAggregate,
  }: {
    ipKind: string;
    toggleIpv4: () => void;
    toggleIpv6: () => void;
    bogonFilter?: string;
    toggleReservedFilter: () => void;
    handleAggregate: (reverse?: boolean) => void;
  },
  ref: ForwardedRef<any>
) {
  return (
    <Grid container ref={ref} direction='row' justifyContent='flex-end'>
      <Grid item>
        <Button
          color='primary'
          size='small'
          variant='contained'
          onClick={() => handleAggregate()}
        >
          聚合
        </Button>
      </Grid>
    </Grid>
  );
}

export default forwardRef(OptionsControl);
