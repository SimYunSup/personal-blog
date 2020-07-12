---
title: KOIN 개발기 - Vue와 React
date: 2020-03-25T00:00:00
description: 초보 개발자가 프레임워크를 Vue에서 React로 마이그레이션을 마친 후기 
canonical_url: false
slug: 'koin-vue-to-react-migration'
published: false
series: false
tags: ["Devlog", "KOIN 개발기"]
---
# 들어가며

동아리에서 만든 학생 커뮤니티 서비스 개발에 참가한지도 벌써 1년이 지났습니다. <del>시간은 참 빨리 가는 것같습니다.</del>  처음에 커뮤니티 어드민 페이지 개편(이라고 쓰고 퇴화라고 부른다)에 참가했을 때는 처음 개발하는 서비스에 걱정과 두려움을 느끼면서 개발을 시작했는데 홍보게시판 개발에 참여하고 React 마이그레이션, 테스트 작성까지 마치면서 자신감이 붙게 되었습니다. 테스트 작성을 끝내고 비는 기간동안 KOIN 서비스의 프레임워크를 Vue에서 React로 마이그레이션을 하면서 느낀점이나 배운점을 적고 공유해보려고 합니다.

> 주니어 개발자의 의견이라 틀린 부분이 있을 수도 있습니다..!

![동아리에서 만든 학생 커뮤니티 서비스 KOIN](./images/koin-vue-to-react-migration-1.png)
_동아리에서 만든 학생 커뮤니티 서비스 KOIN의 모습_

2019년 방학이 오기 전까지는 서비스의 프론트엔드는 Vue 프레임워크로 개발을 해왔었습니다. 그러던 와중 시간이 많이 비는 방학동안 프레임워크를 Vue에서 React로 마이그레이션하기로 결정되었습니다. 

React하지만 React 공식문서의 튜토리얼의 처음 부분을 보고 약간 안심이 되었습니다.

# Vue와 React는 매우 닮았다.

React 공식문서의 튜토리얼에서도 느끼고, Vue에서 React에서 마이그레이션하면서 느낀 것은 Vue와 React는 많이 닮았다는 것을 느낄 수 있었습니다. 가장 큰 기능들이라고 볼 수 있는 것들이 닮았으니 매우 비슷하다고 볼 수도 있습니다. 가장 크게 느꼈던 닮은 점 두가지는 다음과 같습니다.

- Vue에서 배웠던 핵심적인 **Virtual DOM**은 React에서 따온 것입니다.
- 재사용가능한 코드를 컴포넌트로 선언하여 HTML 엘리먼트같이 재사용하기 쉽게 만들 수 있습니다.

이 외에도 직접 떠오르진 않았지만 많은 부분이 비슷해서 수월하게 배우고 적용할 수 있었습니다.

# 하지만..

세부적으로 들어가면 기능과 코드를 짜는 스타일도 모두 다릅니다.  간단한 예제와 함께 차이점을 알아보도록 하죠. 밑의 코드는 사용자 정의 input 컴포넌트와 그의 결과를 보여주는 화면을 만든 것입니다.

```vue{codeTitle: "CustomInput.vue"}
<template>
  <input
    :value="message"
    @change="changeMessage($event)" />
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    message: String,
  },
  methods: {
    changeMessage(e) {
  	  this.$emit('change', e.target.value)
    },
  },
}
</script>
```


```vue{codeTitle: "Home.vue"}
<template>
  <div>
    <custom-input
      :message="msg"
      @change="value => {msg = value}" />
    {{ msg }}
  </div>
</template>

<script>
import CustomInput from '../components/CustomInput.vue'

export default {
  name: 'Home',
  components: {
    'custom-input': CustomInput
  },
  data() {
    return {
      msg: '',
    };
  },
}
</script>
```
_간단하게  Vue로 작성한 input 컴포넌트와 보여주는 화면_

```jsx{codeTitle: "CustomInput.js"}
import React from 'react';

export default function CustomInput({
  message,
  onChangeMessage
}) {
  return (
    <input
      value={message}
      onChange={e => onChangeMessage(e.target.value)} />
  )
}
```

```jsx{codeTitle:"Home.js"}
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';

export default function Home() {
	const [msg, setMsg] = useState('');
  return (
    <div>
      <CustomInput
        message={msg}
        onChangeMessage={setMsg} />
}
```
_간단하게  React로 작성한 input 컴포넌트와 보여주는 화면_

## 컴포넌트간 통신

크게 보면 위의 코드 스타일이 다른 이유가 컴포넌트간 통신을 하는 방법이 다르기 때문이라고 생각합니다. Vue에서 React로 마이그레이션하면서 가장 많이 바뀐 것과 가장 어려워 했던 것이 `props`와 `state`를 관리하는 방법이였습니다.

Vue에서는 `props`와 `event`를 이용한 양방향 데이터 바인딩을 합니다. `props`로 자식 컴포넌트에게 데이터를 전달하고 `custom event`로 부모 컴포넌트에게 데이터와 함께 보내서 부모 컴포넌트에서 그 데이터를 	다루는 함수를 자식 컴포넌트의 event에 구독합니다.

![`props` and event](./images/koin-vue-to-react-migration-2.png)
_Vue 공식 가이드에 있는 컴포넌트간 통신 모형_

```vue{codeTitle: "CustomInput.vue"}{10-12,15}
<template>
  <input
    :value="message"
    @change="changeMessage($event)" />
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    message: String,
  },
  methods: {
    changeMessage(e) {
  	  this.$emit('change', e.target.value)
    },
  },
}
</script>
```
_props로 부모컴포넌트에게서 데이터를 받고 $emit으로 event를 생성한다._

이 방식은 코드를 짤 때에는 쉽지만 후에 유지보수를 하게 되면 데이터를 저장하는 위치와 어떻게 `event`가 발생하는지 파악하기 힘들어집니다. Vue의 공식문서에서는 따로 주의를 하지 않았지만 유지보수와 후에 확장성을 생각하면 `state`를 어디에 위치해야 할 지와 어떻게 `event`를 발생하는 `$emit`을 줄일지 고민한 뒤에 코드를 짜는 것이 좋아보입니다. 아니면 후에 고통을 받으면서 개발을 하겠죠...

React는 `props`로만 통신하는 단방향 데이터 바인딩을 합니다. React에서는 `event`가 없으므로 데이터와 그 데이터를 바꾸는 함수를 모두 자식 컴포넌트에게 전달하고 자식컴포넌트는 그를 이용하는 식으로 데이터를 다룹니다. React의 단방향 데이터 바인딩은 다음에 기술할 반응형 시스템과 합쳐져서 후에 분석하기 좋은 코드를 만들도록 유도합니다.

```jsx{codeTitle: "CustomInput.js"}{4-5,9-10}
import React from 'react';

export default function CustomInput({
  message,
  onChangeMessage
}) {
  return (
    <input
      value={message}
      onChange={e => onChangeMessage(e.target.value)} />
  )
}
```
_props로 부모컴포넌트에게서 데이터와 함수를 받아 HTML 요소의 이벤트에 구독한다._

Vue에서도 [단방향 데이터 바인딩](https://kr.vuejs.org/v2/guide/components.html#%EB%8B%A8%EB%B0%A9%ED%96%A5-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%9D%90%EB%A6%84)을 지원하지만... 이는 단순하게 자식 컴포넌트의 데이터를 초기화하거나 `computed` 속성을 위한 것입니다.

## 반응형 시스템

Vue와 React를 데이터를 다루는 데에 차이가 있는 이유 중 가장 큰 것이 반응형 시스템의 차이때문이라고 생각합니다. 그리고 마이그레이션할 때 가장 애 먹었던 것도 반응형 시스템의 차이 때문이였습니다.. ㅠㅠ

Vue에서는 [공식문서](https://kr.vuejs.org/v2/guide/reactivity.html)에도 말했듯이 

## 코드 스타일?

막말로 Vue에서는 많은 것을 신경쓰지 않고도 생각한대로 만들면 돌아갔습니다.  물론 되는대로 짜서 나오는 안티패턴이나 에러를 방지하고자 [스타일 가이드](https://kr.vuejs.org/v2/style-guide/index.html)라는 것으로 코드 스타일을 규칙에 따라 짜게 합니다. 하지만 대부분 세세한 스타일이기 때문에(큰 것이라고 해봤자 `computed`속성에서 `data`를 바꾸지 말라는 것) 되는대로 짜면서 발생하는 모든 안티패턴을 방지하진 못합니다. 그래서인지 처음 프로젝트에 들어갈 때 분석에 어려움을 느꼈습니다.

그에 반해 React는 [React처럼 생각하고 코드를 짜는 것](https://ko.reactjs.org/docs/thinking-in-react.html)을 명시하고 있고 여기에는 `ProductCategory`를 만들면서 `props`와 `state`를 어디에 배치시켜야 하는지 가이드하고 있습니다. 이는 `props`와 `state`를 어디에 둘지 고민하게 만들고, 후에 분석할 때를 대비해 분석하기 쉽게 합니다. 물론 lint로 막고있지 않아서 분석하기 어려울 수도 있습니다(그럴 일이 없도록 대비해야 겠지만요). 이외에도 Airbnb에서 만든 [스타일 가이드](https://airbnb.io/javascript/react/)도 존재한다고 합니다. 오래됐지만..

## 라우팅과 전역 상태관리 라이브러리

## 이외에도..

- React에서는 이벤트 바인딩을 할 때 함수를 넘겨줘야 하지만 Vue에서는 HTML 바인딩같이 함수 실행 코드(ex. onClick())를 넘겨주어도 잘 작동합니다.
- 

# 끝마치며

React를 공부하면서 역시 React가 Vue보다 생태계가 넓다는 것을 느꼈습니다. Vue보다 오래된 라이브러리인 만큼 레거시인 자료도 있지만 

