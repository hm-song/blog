import Prism from 'prismjs';

import 'prismjs/components/prism-clike.min';
import 'prismjs/components/prism-java.min';
import 'prismjs/components/prism-haml.min';

import 'prismjs/themes/prism-okaidia.css';

export function highlight() {
    Prism.highlightAll();
}