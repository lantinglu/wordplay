import type LocaleText from '@locale/LocaleText';
import ExceptionType from '@nodes/ExceptionType';
import type Node from '@nodes/Node';
import type Evaluator from '@runtime/Evaluator';
import type Step from '@runtime/Step';
import type { BasisTypeName } from '../basis/BasisConstants';
import type Locales from '../locale/Locales';
import type { ExceptionText } from '../locale/NodeTexts';
import type Expression from '../nodes/Expression';
import type Markup from '../nodes/Markup';
import SimpleValue from './SimpleValue';

export default abstract class ExceptionValue extends SimpleValue {
    readonly evaluator: Evaluator;
    readonly step: Step | undefined;

    constructor(creator: Expression, evaluator: Evaluator) {
        super(creator);

        this.evaluator = evaluator;
        this.step = evaluator.getCurrentStep();
    }

    getNodeContext(node: Node) {
        return this.evaluator.project.getNodeContext(node);
    }

    isEqualTo(): boolean {
        return false;
    }

    getType() {
        return new ExceptionType(this);
    }

    abstract getExceptionText(locales: Locales): ExceptionText;

    getDescription() {
        return (l: LocaleText) => l.term.exception;
    }

    abstract getExplanation(locales: Locales): Markup;

    getBasisTypeName(): BasisTypeName {
        return 'exception';
    }

    getRepresentativeText() {
        return '!';
    }

    toWordplay(): string {
        return '!' + this.constructor.name;
    }

    getSize() {
        return 1;
    }
}
