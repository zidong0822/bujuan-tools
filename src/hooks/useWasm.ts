import { useEffect, useState } from 'react';
import __wbg_init, { aggregate } from '../../public/pkg/cidr_aggregator.js';

interface WasmModule {
  aggregate: (
    cidrs: string,
    reverse: boolean,
    exclude_reserved: boolean
  ) => any;
}

export const useWasm = () => {
  const [wasm, setWasm] = useState<WasmModule | null>(null);

  useEffect(() => {
    async function loadWasm() {
      try {
        const wasmModuleUrl = new URL(
          '../../public/pkg/cidr_aggregator_bg.wasm',
          import.meta.url
        );
        const wasmModule = await fetch(wasmModuleUrl).then((response) =>
          response.arrayBuffer()
        );
        await __wbg_init(wasmModule);
        setWasm({
          aggregate: (cidrs, reverse, exclude_reserved) =>
            aggregate(cidrs, reverse, exclude_reserved),
        });
      } catch (err) {
        console.error('Failed to load WebAssembly module:', err);
      }
    }

    loadWasm();
  }, []);

  return wasm;
};
