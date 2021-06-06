// import { Parser } from 'expr-eval';
import useInputs, { InputActions } from './inputs';
import useOutputs, { OutputActions } from './outputs';

const useCreator = () => {
  // const parser = new Parser();
  const [inputs, dispatchInputs] = useInputs();
  const [outputs, dispatchOutputs] = useOutputs();

  const variableExists = (variable: string) => {
    return variable in inputs || variable in outputs;
  };

  // const validateExpression = (expr: string): boolean => {
  //   try {
  //     parser.parse(expr);
  //     return true;
  //   } catch (_) {}
  //   return false;
  // };

  // const formatExpression = (expr: string) => {
  //   if (validateExpression(expr)) {
  //     const fmt_expr = parser.parse(expr).toString();
  //     return fmt_expr.substr(1, fmt_expr.length - 2);
  //   }
  //   return '';
  // };

  const clearAll = () => {
    dispatchInputs({ type: InputActions.clear });
    dispatchOutputs({ type: OutputActions.clear });
  };

  return {
    inputs,
    dispatchInputs,
    outputs,
    dispatchOutputs,
    variableExists,
    // parser,
    // formatExpression,
    // validateExpression,
    clearAll,
  };
};

export default useCreator;
export { InputActions, OutputActions };
