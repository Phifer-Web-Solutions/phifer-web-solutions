<script setup>
const legalContent = "<p><h1>Accessibility Statement</h1></p><p><strong>Last updated:</strong> January 1, 2026</p><p><h2>Our Commitment</h2></p><p>Phifer Web Solutions is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.</p><p><h2>Standards We Aim to Meet</h2></p><p>We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible to people with disabilities.</p><p><h2>Measures We Take</h2></p><p>We take the following measures to ensure accessibility:\n- Use semantic HTML elements\n- Provide text alternatives for non-text content\n- Ensure keyboard navigability throughout the site\n- Maintain sufficient color contrast\n- Use descriptive link text\n- Provide visible focus indicators</p><p><h2>Known Limitations</h2></p><p>While we strive for full accessibility, some content may not yet meet all standards. We are actively working to address these issues.</p><p><h2>Feedback</h2></p><p>We welcome your feedback on the accessibility of phiferwebsolutions.com. If you experience any barriers, please contact us:</p><p>Email: eric@ericphiferllc.com</p><p>We aim to respond to accessibility feedback within 2 business days.</p><p><h2>Formal Complaints</h2></p><p>If you are not satisfied with our response, you may contact the relevant accessibility enforcement body in your jurisdiction.</p>";
</script>

<template>
  <main class="page page--accessibility">
    <h1>Accessibility Statement</h1>
    <div class="legal-content" v-html="legalContent"></div>
  </main>
</template>
