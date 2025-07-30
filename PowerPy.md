---


---

<h1 id="powerpynt">PowerPynt</h1>
<p>Microsoft Tech Club is pleased to bring to you the first competition of this academic year, <strong>PowerPynt</strong>!</p>
<h3 id="competition-problem-statement">Competition Problem Statement</h3>
<p>Pick a tech company and build a PowerPoint presentation explaining why they failed, using <em>only</em> Python (primarily the <code>pptx</code> library, but feel free to use any and as many libraries as you wish!).</p>
<h3 id="example">Example</h3>
<p>For reference, here is a snippet of Python code that generates a PowerPoint presentation:</p>
<pre class=" language-python"><code class="prism  language-python"><span class="token keyword">from</span> pptx <span class="token keyword">import</span> Presentation

<span class="token comment"># creating a presentation</span>
prs <span class="token operator">=</span> Presentation<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># adding a title slide</span>
slide_layout <span class="token operator">=</span> prs<span class="token punctuation">.</span>slide_layouts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
slide <span class="token operator">=</span> prs<span class="token punctuation">.</span>slides<span class="token punctuation">.</span>add_slide<span class="token punctuation">(</span>slide_layout<span class="token punctuation">)</span>
title <span class="token operator">=</span> slide<span class="token punctuation">.</span>shapes<span class="token punctuation">.</span>title
subtitle <span class="token operator">=</span> slide<span class="token punctuation">.</span>placeholders<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
title<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">"PowerPoint from Python"</span>
subtitle<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">"Built for PowerPynt with python-pptx"</span>

<span class="token comment"># adding another slide with bullet points</span>
bullet_slide_layout <span class="token operator">=</span> prs<span class="token punctuation">.</span>slide_layouts<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
slide2 <span class="token operator">=</span> prs<span class="token punctuation">.</span>slides<span class="token punctuation">.</span>add_slide<span class="token punctuation">(</span>bullet_slide_layout<span class="token punctuation">)</span>
title2 <span class="token operator">=</span> slide2<span class="token punctuation">.</span>shapes<span class="token punctuation">.</span>title
content <span class="token operator">=</span> slide2<span class="token punctuation">.</span>placeholders<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
title2<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">"PowerPynt"</span>
content<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">"Lowkey a crazy concept for a competition, ggs"</span>

<span class="token comment"># saving your presentation</span>
prs<span class="token punctuation">.</span>save<span class="token punctuation">(</span><span class="token string">"powerpynt_submission.pptx"</span><span class="token punctuation">)</span>
</code></pre>
<h3 id="rules">Rules</h3>
<ol>
<li>Using ChatGPT is <strong>allowed</strong>.</li>
<li>Presentations not generated using Python will not be accepted; each submission will be thoroughly verified.</li>
<li>Link to the GitHub repository containing the Python file and the generated presentation should be submitted.</li>
</ol>
<h3 id="eligibility">Eligibility</h3>
<p>PowerPynt is <strong>open to student teams of 1-3 all over UAE</strong>, only for a small entry of <strong>5 AED</strong> per team in exchange for exciting cash prizes!</p>
<h3 id="registration">Registration</h3>
<p>Register using this <a href="https://forms.gle/wK2peyigWnXZdbDC6">link</a>!</p>

