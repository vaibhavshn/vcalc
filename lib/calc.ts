import { Inputs } from '@/hooks/inputs';
import { Outputs } from '@/hooks/outputs';
import { Parser } from 'expr-eval';
import { isNumber, pickBy, mapValues } from 'lodash';

interface CalcResult {
  value: string;
  error?: string;
}

class Calc {
  parser: Parser;
  constructor() {
    this.parser = new Parser();
  }

  evaluate(expr: string, inputs: Inputs): CalcResult {
    try {
      const res = this.parser.parse(expr).evaluate(inputs);
      return {
        value: res,
      };
    } catch (e) {
      return {
        value: '',
        error: e.message,
      };
    }
  }

  calculate(inputs: Inputs, outputs: Outputs): Record<string, CalcResult> {
    let results: Record<string, CalcResult> = {};
    for (const [field, expr] of Object.entries(outputs)) {
      results[field] = this.evaluate(expr, {
        ...inputs,
        ...pickBy(
          mapValues(results, (result) => result.value),
          isNumber
        ),
      });
    }
    return results;
  }
}

export type { CalcResult };
export default Calc;
