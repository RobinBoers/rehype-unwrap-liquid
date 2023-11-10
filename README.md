# rehype-unwrap-liquid

Simple rehype plugin that removes the enclosing `<p>` and `</p>` from lines that contain only _a single liquid tag_.

Forexample: `{% render "footer.html" %}` becomes `{% render "footer.html" %}` instead of `<p>{% render "footer.html" %}</p>`.
