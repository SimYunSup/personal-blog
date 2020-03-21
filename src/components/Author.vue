<template>
	<div class="author">

		<a href="//github.com/SimYunSup">
			<i class="fab fa-github"></i>
		</a>
		<a href="./rss.xml">
			<i class="fa fa-rss"></i>
		</a>

	</div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
	props: ['showTitle']
}
</script>

<style lang="scss">
.author {
	margin: 0 auto;
	max-width: 500px;
	text-align: center;
	padding: 1em;

	a {
		margin: 0 .5em;
	}

	a i {
		font-size: 1.5rem;
		color: var(--body-color);
	}
}
</style>
