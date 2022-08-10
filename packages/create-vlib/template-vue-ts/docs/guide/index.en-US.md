# Introduction

`ruabick` is documentation tool for developing libraries (based on VitePress)。The functional design was copied from [dumi](https://d.umijs.org). But `dumi` currently does not support `vue`.

::: info
The predecessor of the project was [vitepress-for-components](https://github.com/dewfall123/vitepress-for-component)
:::

## Motivation

VitePress is very fast and lightweight, but there is the following shortcomings under the scene of the component document:

##### 1. The document and Demo have to be written twice.

> Refer to [dumi's demo-principle](https://d.umijs.org/guide/demo-principle)

##### 2. Documentation, Demo and source code in different directories, The sense of contact is not strong.

> The source code and Demo are usually in the `src` directory, but VitePress usually needs to create a new 'docs' directory, which should be in the same place.

> Refer to [dumi's directory structure](https://d.umijs.org/guide/basic)

##### 3. We need the function of automatically generate component API document.
