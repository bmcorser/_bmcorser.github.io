Git ProTip
##########

A less insane way to manage multiple SSH identities
===================================================

There are any number of blog posts advertising some pretty wacky ways to set up
your computer to use different identities for the same host\ [#] depending on
the repository you’re working in. Most involve configuring SSH to listen out
for the hostname mangled with the name of the identity to be used which is then
unmangled in the ``~/.ssh/config`` file. I didn’t find this to be a
satisfactory solution and never used it.

.. [#] Read ``github.com``

There are other ways\ *!*

Since Git `version 2.3.0`_ (Feb 2015), an environment variable
``GIT_SSH_COMMAND`` has been read by the program to replace, as you might
imagine, the SSH command used when talking over the network using SSH.

.. _`version 2.3.0`: https://github.com/git/git/blob/master/Documentation/RelNotes/2.3.0.txt#L25-L27

For some time I used this to “manage” identities when interacting with GitHub
remotes, but it wasn’t perfect and and ended up with eye-wateringly ugly
commands like::

    GIT_SSH_COMMAND='ssh -i ~/.ssh/id_rsa_job_a’ git push origin ben/local-name:ben/remote-name

which are hard to read. And hard to read is upsetting.

Since Git `version 2.10.0`_ (Aug 2016), it has been possible to access the
equivalent functionality offered by ``GIT_SSH_COMMAND`` environment variable
through Git’s config file. The new config variable is ``core.sshCommand`` and
(as it’s so concisely stated in the release notes) it allows the user to
specify what value for ``GIT_SSH_COMMAND`` to use per repository.

Just set ``core.sshCommand`` as any other Git config variable, specifying the
identity that is to be used for that repository::

    git config core.sshCommand 'ssh -i ~/.ssh/id_rsa_job_a'

and next time you run a SSH-requiring Git command from that repo, the specified
identity will be used.

.. _`version 2.10.0`: https://github.com/git/git/blob/master/Documentation/RelNotes/2.10.0.txt#L83-L84
