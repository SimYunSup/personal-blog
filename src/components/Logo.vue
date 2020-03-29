<template>
	<g-link class="logo" to="/">
		<g-image src="~/assets/images/favicon-96x96.png" width="32" />
	  <span class="logo__text">
	    &nbsp;&nbsp;{{ $static.metadata.siteName }}
	  </span>
	</g-link>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style lang="scss">
.logo {
	text-decoration: none;
  color: var(--body-color)!important;
  font-size: .9em;
	display: flex;
	align-items: center;

	&__image {
		vertical-align: middle;
		border-radius: 99px;
		height: 40px;
		width: 40px;
		margin-right: .5em;
	}


	@media screen and (max-width: 921px) {
		&__text {
			display: none;
		}
	}
}
</style>
