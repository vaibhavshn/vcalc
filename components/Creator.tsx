import useInputs, { InputActions } from '@/hooks/inputs';
import useOutputs, { OutputActions } from '@/hooks/outputs';

export default function Creator() {
  const [inputs, dispatchInputs] = useInputs();
  const [outputs, dispatchOutputs] = useOutputs();
  return <div>Creator</div>;
}
