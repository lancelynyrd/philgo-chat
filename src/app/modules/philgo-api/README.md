# PhilGo Restful API

* This philgo api v4.

## TODO

* capsulate locations of Philipines.
  * Make it class.
* Message functionality.

## Environment

* PhilGo Api is an opinionated service for PhilGo.COM. It uses
  * PhilGo Database.
  * PhilGo Firebase Project.
  * PhilGo push notification system.

* To see PhilGo Api log file on Macbook

```` sh
tail -f ~/tmp/sapcms_debug.log
````

### Firebase

* `firebsae` node module must be installed and initialized correctly on philgo-api.service.ts

### Ionic

* philgo api components will only work with ionic.

## Document

* [PhilGo Api Example](https://github.com/thruthesky/philgo-api-example)
* [PhilGo API v4 Document](https://docs.google.com/document/d/1E_IxnMGDPkjOI0Fl3Hg07RbFwYRjHq89VlfBuESu3BI/edit#)
* [PhilGo API](https://docs.google.com/document/d/1DbGXezNIVoOgFmjhnnZBZjrsx9vEwSVv-BzSJHB3C2s/edit#heading=h.wuw5os21mdy)
* [PhilGo Family Github](https://github.com/thruthesky/philgo-family) which uses this project.

## Examples

* [PhilGo Chat App Example](https://github.com/thruthesky/philgo-chat/tree/philgo-api-chat-example)

* [Examples of PhilGo API](https://github.com/thruthesky/philgo-api-old)
  * [Components example of PhilGo API](https://github.com/thruthesky/philgo-api-old/tree/master/components)

* Old version of [PhilGo API v2](https://github.com/thruthesky/philgo-api/tree/8bcd9b53d06e6acec2bb80f2aa0bfbe59f61b881)

## Install

### Adding PhilGo API as subtree

* You can add philgo-api as subtree of any angualr/ionic project under src/app/module/philgo-api.
* You need to install `angular-library` and `language-translate` as dependencies.
* And you will need firebase by default.

```` sh
git submodule add https://github.com/thruthesky/philgo-api src/app/modules/philgo-api
git submodule add https://github.com/thruthesky/angular-library src/app/modules/angular-library
git submodule add https://github.com/thruthesky/language-translate src/app/modules/language-translate
npm i firebase
````


* import `HttpClientModule` in app.module.ts

* Initialize `Firebase` and `PhilGoApiService` in app.module.ts

```` typescript
import * as firebase from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyA1X3vpzSpUk_JHCbNjEwQe1-pduF0Enqs',
  authDomain: 'philgo-64b1a.firebaseapp.com',
  databaseURL: 'https://philgo-64b1a.firebaseio.com',
  projectId: 'philgo-64b1a',
  storageBucket: 'philgo-64b1a.appspot.com',
  messagingSenderId: '675064809117'
};
firebase.initializeApp(firebaseConfig);

export class AppModule {
  constructor(philgo: PhilGoApiService) {
    philgo.setServerUrl('http://192.168.0.254/sapcms_1_2/api.php');
    philgo.setFileServerUrl('http://192.168.0.254/sapcms_1_2/index.php');
    philgo.setNewFileServerUrl('http://192.168.0.254/file-server/index.php');
    /**
     * Call 'postConfigs()' to load post_config table configurations from server.
     * @see https://docs.google.com/document/d/1E_IxnMGDPkjOI0Fl3Hg07RbFwYRjHq89VlfBuESu3BI/edit#heading=h.42un1kwuv7s8
     */
    philgo.postConfigs().subscribe(res => {});
  }
}
````

* Another example of initialization

```` typescript
  constructor(private philgo: PhilGoApiService) {
    philgo.setServerUrl(environment.philgoServerUrl);
    philgo.setFileServerUrl(environment.philgoFileServerUrl);
    philgo.setNewFileServerUrl(environment.newFileServerUrl);
    philgo.setFirebaseApp(firebase);
    // philgo.loadPostConfigs().subscribe(res => { });
    philgo.app('abc.config').subscribe( res => philgo.config = res );
  }
````


### Adding PhilGo Api Components

* It needs `philgo-api`, `angular-library`, 

```` sh
git submodule add https://github.com/thruthesky/components src/app/modules/components
ionic cordova plugin add cordova-plugin-camera
npm install --save @ionic-native/camera
````



## TEST

* Test service put the service in root injector by using `providedIn: root`. So, no need to import it in module while `PhilGoApiService` needs to be imported by each module.

* [Old test code example](https://github.com/thruthesky/philgo-api-old/blob/master/providers/philgo-api-test.service.ts)
* http://localhost:4200/test/philgo/home for test page
* http://localhost:4200/test/philgo/register

## Example Codes

* @see home.ts to get forums
* get posts of a category

```` typescript
    let req = { post_id: this.post_id, page_no: this.page_no };
    this.post.page( req, ( posts: POSTS ) => {
      console.log('posts: ', posts);
      this.posts = posts;
    }, e => {
      alert( e );
    });
````

## Search

@see home.ts for search.

## Debugging

* To see Reqeust Url, do below.

```` typescript
    this.post.debug = true
````

## Comment Create

```` typescript
        let c = <POST_DATA> {};
        c.id = this.login.id;
        c.session_id = this.login.session_id;
        c.idx_parent = idx_parent;
        c.subject = "Comment title";
        c.content = "Comment content";
        console.log("comment create data: ", c);
        this.post.debug = true;
        this.post.createComment( c, data => {
            console.log('createComment() data: ', data);
            this.updateComment( data.post.idx );
        }, error => {
            console.error("create comment error: " + error );
            alert( error );
        });

````

## Locations of Philippines

You can get provinces and cities of province like below.

 * @example to get provinces : http://philgo.com/etc/location/philippines/json.php
 * @example to get cities of a province : http://philgo.com/etc/location/philippines/json.php?province=Bohol
 * @example to get all the provinces and cities : http://philgo.com/etc/location/philippines/json.php?province=all

 ```` typescript
    http.get( 'http://philgo.com/etc/location/philippines/json.php' )
      .subscribe( re => {
        let data = JSON.parse( re['_body'] );
        this.provinces = data;
        console.log('place:', data);
      });
````

### latest-component

This component shows latest component.

This shows in three format.

1. text only.
2. text with thumbnail.
3. thumbnail only.

### view component

### Event

* view component will emit 'edit' event if edit button clicked.

### broken image

* for broken thumbnail images, most likely, GIF images can have thumbnail, we show original image.

```` html
    <img *ngFor=" let photo of post.photos " [src]=" photo.url_thumbnail " (error)="photoImg.src = photo.url " #photoImg>
````

## Examples

### How to do post query to server

See `api.post()` to learn how to use api post query.

```` typescript
    api.setUrl( 'https://local.philgo.com/api.php' );
    api.post({ method: 'version' }).subscribe( re => {
      console.log('data: ', re);
    }, e => console.log(`Error code: ${e.code}, message: ${e.message}`));
````

### How to build and use api method

See the simplest `api.version()` and `api.exchangeRate()` method on how to call and build.

```` typescript
    api.version().subscribe( re => {
      console.log('version: ', re.version);
    }, e => console.log(`Error code: ${e.code}, message: ${e.message}`));
    api.exchangeRate().subscribe( re => {
      console.log('exchangeRate: ', re);
    }, e => console.log(`Error code: ${e.code}, message: ${e.message}`));
````

### General Post Query

`api.query()` is the general query method. You do not need to create api service method anymore since `api.query()` can take all the queries.

```` typescript
    api.query<ApiCurrencyResponse>('exchangeRate', {currency: 'php'}).subscribe( re => {
      console.log('usd: ', re.usd);
      console.log('php: ', re.php);
    }, e => console.log(e));
````

## Protocol

### Response

If there is no data, code is always 0. and data has the response from server.

If code is not 0, then it is considered as an error response from PhilGo Api.

```` josn
{
    code: 0,
    data: ... response data ...
}
````

### Error code

* -400 cannot connect to webserver or PHP script error.
* -500 Server Internal error.

## Api Unit Test

Run tests like below.

```` typescript
import { Component } from '@angular/core';
import { ApiCurrencyResponse } from '../../modules/philgo-api/providers/philgo-api.service';
import { PhilGoApiTestService } from '../../modules/philgo-api/providers/philgo-api-test.service';
@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [PhilGoApiTestService]
})
export class HomePage {
  constructor(
    t: PhilGoApiTestService
  ) {
    t.setUrl('https://local.philgo.com/api.php').run();
  }
}
````

## Pages

### Forum List Page

* see [philgo-family main project page list](https://github.com/thruthesky/philgo-family/blob/master/projects/main/src/app/pages/forum/list/list.page.ts) for best example.

## Components

### Reusable Components

* All components display error on its compment templates Unless `[displayError]` is set to false.
  * Errors are displayed in classes of `.api-error`, `.code`, `.message`.
* All components have output property of `(error)` when an error occurs.

### Text translation for components

* All texts are customizable via `[text]` property.
  You can change it the text by giving new JSON object into [text] property.
* Texts are
  * email, password, nickname, name, mobile, error, submitting, register, loadingProfile, deletePrimaryPhoto
  * email, password, submitting, login

### Cypress e2e test

* Components are tested with Cypress.
* Edit integrationFolder to `philgo-family` project folder and set `baseUrl` in cypress.json.
* Edit package.json for `script: { e2e: 'cypress open' }`
* And run `npm run e2e`

* Example of cypress.json

```` json
{
    "integrationFolder": "projects/modules",
    "testFiles": "**/*.spec.js",
    "baseUrl": "http://localhost:4200/"
}
````

### user-register-and-profile

* This is a resuable component for user registration and update.
* It has `[displayError]`, `[text]`, `(register)`, `(update)`, `(error)`.

* example of app-user-register-profile-component

```` html
<app-user-register-and-profile-component
    (register)=" justRegistered = true "
    (update)=" justRegistered = false "
    (error)=" onError($event) "
    [displayError]="false"
    [text]="{
        email: '이메일'
    }"
>
</app-user-register-and-profile-component>
````

### Forum components

#### Post list component

* This component is highly resusable.
* The DOM layout of posts has two shape.

* when it is collapsed to show only summary of post.

```` html
.post-list
  .posts
    .post
      <a>
````

* When it is opened to show the full content of the post.

```` html
  .post-list[post_id="post id"]
    .posts
      .post
        <app-post-view-component>
          .post-view
            .post-display
              .post-subject
              .post-meta
              .post-content
              <app-data-component>
                  .files
                    .file
              nav.post-buttons
                <button class="post-good">
                <button class="post-bad">
                <button class="post-edit">
                <button class="post-delete">
                <button class="post-report">
                <button class="post-close">
            <app-comment-edit-component>
            <app-comment-list-component>
          <app-post-edit-component>
````

#### Layout and Design for forum coponents

* When post has image which is very wide, the layout may look urgly.
  You can adjust the layout by limiting the max width like below.
  Remember to do it on global css since there is no layout css code in forum components.

* Example of limiting the width

```` scss
$post-content-width: $page-width - ( $sidebar-width * 2 );
.post-edit, .post-list {
    max-width: $post-content-width;
    overflow: hidden;
}
````

* Or if you are using flex based layout, try below.

```` scss
main {
  margin: 0 auto;
  max-width: $page-width;
  min-height: $lg-main-min-height;
  .body {
    display: flex;
    .left {
      flex-basis: $sidebar-width;
    }
    .center {
      flex-grow: 1;
        max-width: $center-width;
        overflow: hidden;
    }
    .right {
      flex-basis: $sidebar-width;
    }
  }
}
````

## Chat

* Simply use `app-chat-all-rooms` component selector and it will begin chat app.

### Chat Room Route

* When chat room is clicked/created, it will navigate to `/room/:idx`.
  So, the app must have chat room page on `/room/:idx` route.

### New Chat Message from other room

* 현재 방이 아닌 다른 방의 새 채팅 메세지는 토스트로 보여주면 된다.
* 다른 방의 채팅 메시지를 들으려면 먼저 내 방 목록을 listen 해야 한다. 내 방 목록 listen 은 내 방 목록 페이지와 아무 방이나 들어가면 할 수 있도록 한다.

```` typescript
philgo.newMessageFromOtherRoom.subscribe(message => {
  this.toastMessage(message);
});
````

### Loading my rooms

* 내 방 목록을 읽으면 philgo api service 내부적으로 처리를 한다.
  따라서 방 목록 페이지 보기, 방 입장, 방 나가기 등 방 목록에 변화가 있을 때 마다 한번씩 호출하면 된다.

* 내 방 목록을 할 때, 내부적으로 캐시를 하도록 callback 을 호출한다.
  이렇게 하면 내 방 목록을 할 때 마다 자동 캐시를 하는 것이다.


### Chat room cache

* 복잡한 캐시는 프로그램 코드 관리를 어렵게 한다.

* 방 목록 또는 방 입장을 할 때, Philgo api server 에서 firebase fcm 과 realtime data 를 위해서 접속을 하므로 속도가 많이 느리다.

* 따라서 캐시를 하는데, 내 방 목록만 캐시를 한다.
  캐시를 할 때, 마지막 30개 메시지도 같이 캐시를 하므로,
  방 입장을 할 때, 내방 목록에서 캐시한 마지막 30개 메시지를 먼저 보여준다. 그럼 매우 빠르게 보인다.
    그리고 나서, 실제 서버로 방 입장 정보를 전달 받고, 그 방 입장 정보에는 최근 100 개의 메시지가 있는 데 그 100개 메시지를 보여준다.

* 방 나가기 또는 메인으로 내 방 목록으로 이동 할 때, 다시 내방 목록을 한다.

* 이렇게 하는 경우, 대충 괜찮아 보인다.
  예를 들어, 방 A 에서 ==> 내방 목록 ==> 방 B 로 가면, 최근 메시지가 보인다.
  하지만, 방 A 에서 ==> 방 B 로 바로 가면 내 방 목록이 보이지 않는다. ( 방 A 를 나가면 다시 방 목록을 캐시하는데, 캐시하기 전에 방 B 로 먼저 들어가 버리기 때문. )
  이 정도는 괜찮다. 전반적으로 매우 빨라졌으며 만족할만하다.

## Login

* `app-login-component` emits `error` event. so, you can simply toast it.

```` html
<app-login-component (error)=" a.toast( $event ) "></app-login-component>
````

```` scss
ion-toast {
    &.error {
        .toast-container {
            background-color: rgb(141, 0, 0);
        }
    }
}
````

```` ts
/**
 * Toast on app.
 * @param o string or object.
 *  if it is an object,
 *    {
 *      code: number,   // if code is not 0, it means, error.
 *      message: string,
 *      closeButtonText: string   // customize close button text.
 *      duration: number          // ms. default is 10000(10s). you can put it big number for test.
 *    }
 * @example
    e.duration = 100000;
    this.a.toast(e);
  * @description If the toast is an error toast
  *    <ion-toast class="error errorNO"> will be added in class.
  *    Normally error code is like -1234, so, the error class will be 'error error-1324'
  */
async toast(o: any) {
  if (typeof o === 'string') {
    o = {
      message: o
    };
  }
  if (o.closeButtonText === void 0) {
    o.closeButtonText = this.tr.t({ ko: '닫기', en: 'Close', jp: '閉じる', ch: '关' });
  }
  if (o.duration === void 0) {
    o.duration = 10000;
  }
  if (typeof o.code !== void 0 && o.code) {
    /**
     * If session id is invalid, let the user log out.
     */
    if (o.code === ERROR_WRONG_SESSION_ID || o.code === ERROR_WRONG_IDX_MEMBER) {
      this.philgo.logout();
    }
    o.cssClass = `error error${o.code}`;
  }
  o.showCloseButton = true;
  const toast = await this.toastController.create(o);
  toast.present();
}
````


## POST API

### POST Search

* `post.search` is very similiar to `post.query`. It accepts more sanitized input and output.

```` typescript
const and = [];
if (this.form[N.gender]) {
    and.push(`${N.gender}='${this.form[N.gender]}'`);
}
if (this.city) {
    and.push(`${N.city}='${this.city}'`);
}
const req: ApiPostSearch = { post_id: this.post_id, category: this.category, page_no: this.page_no, limit: this.limit, deleted: 0 };
req.and = and.join(' AND ');
if (options.view) {
    req.view = options.view;
}
this.philgo.postSearch(req).subscribe(search => {
````

### POST Query

* 필고 데이터베이스에 서버에 게시글 질의를 바로 한다.

아래의 예제는 `플러스친구` 카테고리의 소식만 가져오는 것이다.

```` typescript
this.philgo.postQuery({
  where: `post_id='freetalk' AND category='플러스친구'`
}).subscribe( res => {
  console.log('postQuery: ', res);
}, e => console.error(e));
````

* 활용) 특정 코드에 맞는 글만 가져오기.

예를 들어 각 앱/웹의 메인에 표시해도 좋을 뉴스를 코드 `main-news-YYYYMMDDHH` 와 같이 표현을 한다면, 아래와 같이 `access_code` 쿼리를 해서, 가장 마지막 뉴스 코드를 하나 가져 올 수 있다.

```` typescript
this.philgo.postQuery({
  where: `access_code LIKE 'main-news%'`,
  orderby: `access_code DESC`,
  limit: 1
}).subscribe( res => {
  console.log('postQuery: ', res);
}, e => console.error(e));
````

* 하지만 일반적으로 메인 페이지에 정보를 가져오는 것이라면, 메인페이지에 필요한 모든 정보를 한번에 가져오는 것이 낳다.

아래의 예제 처럼, front page 의 필요한 모든 정보를 한번에 가져와서 처리를 한다. 최근 글, 뉴스 글, 공지 글 등을 한번에 가져온다.

```` typescript
  philgo.app('philgo-chat.frontPage', { news: true }).subscribe(res => {
    console.log('app: ', res);
  }, e => console.error(e));
````


## File Upload

```` typescript
  onChangeFile(event: Event) {
    if (AngularLibrary.isCordova()) {
      return;
    }
    const files = event.target['files'];
    if (files === void 0 || !files.length || files[0] === void 0) {
      this.error = { code: -1, message: this.philgo.t({ en: 'Please select a file', ko: '업로드 할 파일을 선택해주세요.' }) };
    }
    this.philgo.fileUpload(files, { gid: this.form.gid }).subscribe(res => {
      if (typeof res === 'number') {
        console.log('percentage: ', res);
      } else {
        console.log('file success: ', res);
      }
    }, e => console.error(e));
  }
````


## Tooltip, Popover Component

* tooltip component is a helper component to display tooltip easily.

```` html
<ion-item (click)="tooltip.present( $event, {content: '아래의 광고 배너 중 정사각형 배너는 필수입니다. 그 외 두가지는 옵션이며, 광고 배너를 모두 올리면 광고가 더 많이 노출될 확율이 높습니다.'} )">
  <ion-icon name="help"></ion-icon>
</ion-item>
````


## URL & Paths


### 게시판 목록 URL


* 일반 게시판 목록은 `/forum/:post_id` 로 통일을 한다.

* 때로는 `job`, `ads` 게시판 등은 URL 의 주소가 중요하므로 route 를 따로 만들수 있다. 예제) `/job/:category`, `/ads`

* 하지만 URL 주소가 중요하지 않은 경우, 그냥 기본 URL 목록을 따른다.

### 게시글 읽기 URL

* 일반적으로 게시글은 게시판 목록 위에 보여준다. 즉, 게시글 읽기 페이지가 따로 존재하지 않는다.
* 게시글 읽기를 하면, 게시판 목록의 제목 및에 글 내용을 보여주고, push state 만 바꾸어 주면 된다.
* 만약, SEO 가 필요하면 PHP 단에서 적절히 처리를 하면 된다.

글 읽기 URL 은 글 목록 맨 끝에 `:idx` 를 추가한다.
예제)
`/forum/freetalk/:idx`
`<div routerLink="/forum/{{ post.post_id }}/{{ post.idx }}">`
`/job/:category/:idx`
`/ads/idx`



If a post is clicked on post-list page, it will draw down the content and comments of the post instead of routing into a new page.
Normally, there is no post view page. 
When a route is being access to view a post, then the url of the route should be `.../:idx` to indicate that this needs to display post on top of the post list.




## Provinces and Cities of Philippines

```` typescript
philgo.provinces().subscribe(res => {
    console.log('provinces: ', res);
    philgo.cities( res[1] ).subscribe( cities => {
        console.log('cities: ', cities);
    });
});
````


